import styled, { css } from "styled-components";
import { 
  maxWidth,
} from "../../lib/styled/sizes";
import {borderRadius} from "../../lib/styled/borderRadius"
import {shadows} from "../../lib/styled/shadows"
import {transition} from "../../lib/styled/transition"

// Типы пропсов
type MessageType = 'incoming' | 'outgoing'
type MessageStatus = 'sent' | 'delivered' | 'read' | 'pending'

interface MessageBoxProps {
  text: string
  type?: MessageType
  status?: MessageStatus
  timestamp?: string
  isFirst?: boolean
  isLast?: boolean
}

// Цветовая схема
const colors = {
  incoming: {
    bg: '#f1f1f1',
    text: '#1a1a1a',
    time: '#8e8e8e',
  },
  outgoing: {
    bg: '#007bff',
    text: 'white',
    time: 'rgba(255, 255, 255, 0.7)',
  },
  status: {
    sent: '#8e8e8e',
    delivered: '#8e8e8e',
    read: '#34b7f1',
    pending: '#8e8e8e',
  }
}

// Статусы сообщений
const statusIcons = {
  sent: '✓',
  delivered: '✓✓',
  read: '✓✓',
  pending: '⋯'
}

// Основной контейнер сообщения
const MessageContainer = styled.div<{ $type: MessageType; $isFirst: boolean; $isLast: boolean }>`
  display: flex;
  ${props => props.$type === 'outgoing' ? 'justify-content: flex-end;' : 'justify-content: flex-start;'}
  margin-bottom: 4px;
  ${transition}
`

// Блок сообщения
const MessageBubble = styled.div<{ $type: MessageType; $isFirst: boolean; $isLast: boolean }>`
  ${maxWidth('70%')}

  ${borderRadius.m}
  ${shadows.soft}
  
  position: relative;
  padding: 10px 14px;
  background-color: ${props => colors[props.$type].bg};
  color: ${props => colors[props.$type].text};
  word-wrap: break-word;
  
  // Скругление углов в зависимости от позиции в группе
  ${props => {
    if (props.$type === 'incoming') {
      return css`
        border-bottom-left-radius: ${props.$isLast ? '4px' : '12px'};
        
        ${props.$isFirst && css`
          border-top-left-radius: 4px;
        `}
      `
    } else {
      return css`
        border-bottom-right-radius: ${props.$isLast ? '4px' : '12px'};
        
        ${props.$isFirst && css`
          border-top-right-radius: 4px;
        `}
      `
    }
  }}
`

// Контейнер для текста и метаинформации
const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
`

// Текст сообщения
const MessageText = styled.p`
  margin: 0;
  line-height: 1.4;
  white-space: pre-wrap;
`

// Нижняя панель с временем и статусом
const MessageFooter = styled.div<{ $type: MessageType }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  margin-top: 4px;
  font-size: 11px;
  color: ${props => colors[props.$type].time};
`

// Время сообщения
const MessageTime = styled.span`
  font-size: 11px;
`

// Статус сообщения
const MessageStatus = styled.span<{ $status: MessageStatus }>`
  font-size: 14px;
  line-height: 1;
  color: ${props => {
    if (props.$status === 'read') return colors.status.read
    if (props.$status === 'delivered') return colors.status.delivered
    return colors.status.sent
  }};
`

// Дата-разделитель
const DateDivider = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
  font-size: 12px;
  color: #8e8e8e;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #eaeaea;
    margin: auto 8px;
  }
`

// Индикатор печатания
const TypingIndicator = styled.div`
  ${borderRadius.m}
  ${shadows.soft}
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 16px;
  background-color: ${colors.incoming.bg};
  width: fit-content;
  
  span {
    width: 8px;
    height: 8px;
    background-color: ${colors.incoming.text};
    border-radius: 50%;
    opacity: 0.6;
    animation: typing 1.4s infinite;
    
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
  
  @keyframes typing {
    0%, 60%, 100% {
      transform: translateY(0);
      opacity: 0.6;
    }
    30% {
      transform: translateY(-4px);
      opacity: 1;
    }
  }
`

// Основной компонент
export const MessageBox = ({ 
  text, 
  type = 'incoming',
  status = 'sent',
  timestamp = '12:00',
  isFirst = false,
  isLast = false
}: MessageBoxProps) => {
  return (
    <MessageContainer $type={type} $isFirst={isFirst} $isLast={isLast}>
      <MessageBubble $type={type} $isFirst={isFirst} $isLast={isLast}>
        <MessageContent>
          <MessageText>{text}</MessageText>
          <MessageFooter $type={type}>
            <MessageTime>{timestamp}</MessageTime>
            {type === 'outgoing' && (
              <MessageStatus $status={status}>
                {status === 'pending' ? statusIcons.pending : statusIcons[status]}
              </MessageStatus>
            )}
          </MessageFooter>
        </MessageContent>
      </MessageBubble>
    </MessageContainer>
  )
}

// Группа сообщений
interface MessageGroupProps {
  messages: Array<Omit<MessageBoxProps, 'isFirst' | 'isLast'>>
  type: MessageType
}

export const MessageGroup = ({ messages, type }: MessageGroupProps) => {
  return (
    <>
      {messages.map((msg, index) => (
        <MessageBox
          key={index}
          {...msg}
          type={type}
          isFirst={index === 0}
          isLast={index === messages.length - 1}
        />
      ))}
    </>
  )
}

// Компонент с датой
interface DatedMessageBoxProps extends MessageBoxProps {
  showDate?: boolean
  date?: string
}

export const DatedMessageBox = ({ 
  showDate, 
  date, 
  ...props 
}: DatedMessageBoxProps) => {
  return (
    <>
      {showDate && date && <DateDivider>{date}</DateDivider>}
      <MessageBox {...props} />
    </>
  )
}

// Пример использования:
// <MessageBox 
//   type="outgoing" 
//   text="Привет! Как дела?" 
//   status="read"
//   timestamp="14:30"
// />
//
// <MessageGroup 
//   type="incoming"
//   messages={[
//     { text: "Привет!", status: "read" },
//     { text: "Нормально, а у тебя?", status: "read" },
//     { text: "Как проходит день?", status: "delivered" }
//   ]}
// />
//
// <TypingIndicator />