import { HStack } from 'shared/lib/styled/stack'
import styled from 'styled-components'

import { horizontalPadding } from 'shared/lib/styled/paddings.tsx'
import { HelpCircleIcon } from '../../assets/HelpCircleIcon'
import { IconWrapper } from '../../assets/IconWrapper'

import { Tooltip } from '.'

interface WithHintProps {
  hint?: React.ReactNode;
  children? : React.ReactNode;
}

const Container = styled(IconWrapper)`
  ${horizontalPadding(4)};
  
`

export const WithHint = ({ children, hint }: WithHintProps) => {
  return (
    <HStack alignItems="center">
      {children}
      {hint && (
        <Tooltip
          placement="top"
          content={hint}
          renderOpener={(props) => (
            <Container {...props}>
              <HelpCircleIcon />
            </Container>
          )}
        />
      )}
    </HStack>
  )
}