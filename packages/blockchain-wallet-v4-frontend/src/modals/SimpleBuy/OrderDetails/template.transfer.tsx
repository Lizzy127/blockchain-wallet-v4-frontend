import { Button, Icon, Text } from 'blockchain-info-components'
import { convertBaseToStandard } from 'data/components/exchange/services'
import { fiatToString } from 'blockchain-wallet-v4/src/exchange/currency'
import { FlyoutWrapper } from 'components/Flyout'
import { FormattedMessage } from 'react-intl'
import { OwnProps, SuccessStateType } from '.'
import Currencies from 'blockchain-wallet-v4/src/exchange/currencies'
import React from 'react'
import styled from 'styled-components'

type Props = OwnProps & SuccessStateType

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
`
const TopText = styled(Text)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Bottom = styled(FlyoutWrapper)`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
`
const InfoContainer = styled.div`
  margin-top: 16px;
`
const Row = styled.div`
  padding: 16px 40px;
  box-sizing: border-box;
  border-top: 1px solid ${props => props.theme.grey000};
  &:last-child {
    border-bottom: 1px solid ${props => props.theme.grey000};
  }
`
const Title = styled(Text)`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.theme.grey600};
`
const Value = styled(Text)`
  margin-top: 4px;
  font-size: 16px;
  font-weight: 600;
  color: ${props => props.theme.grey800};
`

const TransferDetails: React.FC<Props> = props => {
  return (
    <Wrapper>
      <div>
        <FlyoutWrapper>
          <TopText color='grey900' size='20px' weight={600}>
            <FormattedMessage
              id='modals.simplebuy.transferdetails'
              defaultMessage='Transfer Details'
            />
            <Icon
              cursor
              name='close'
              size='20px'
              color='grey600'
              onClick={() => props.handleClose()}
            />
          </TopText>
          <InfoContainer>
            <Text color='grey600' weight={500} size='14px'>
              <FormattedMessage
                id='modals.simplebuy.transferdetails.info'
                defaultMessage='Securely transfer {fiatCurrency} from your bank account to Blockchain.com. Depending on the transfer method and availability of funds, this may take up to 1 business day.'
                values={{
                  fiatCurrency: props.order.inputCurrency
                }}
              />
            </Text>
          </InfoContainer>
        </FlyoutWrapper>
        <Row>
          <Title>
            <FormattedMessage
              id='modals.simplebuy.transferdetails.bankname'
              defaultMessage='Bank Name'
            />
          </Title>
          <Value>{props.account.agent.name}</Value>
        </Row>
        <Row>
          <Title>
            <FormattedMessage
              id='modals.simplebuy.transferdetails.bankid'
              defaultMessage='Bank ID'
            />
          </Title>
          <Value>{props.account.agent.account}</Value>
        </Row>
        {props.account.currency === 'USD' && (
          <Row>
            <Title>
              <FormattedMessage
                id='modals.simplebuy.transferdetails.address'
                defaultMessage='Address'
              />
            </Title>
            <Value>{props.account.agent.address}</Value>
          </Row>
        )}
        {props.account.currency === 'USD' && (
          <Row>
            <Title>
              <FormattedMessage
                id='modals.simplebuy.transferdetails.routingnumber'
                defaultMessage='Routing Number'
              />
            </Title>
            <Value>{props.account.agent.routingNumber}</Value>
          </Row>
        )}
        {(props.account.currency === 'USD' ||
          props.account.currency === 'GBP') && (
          <Row>
            <Title>
              <FormattedMessage
                id='modals.simplebuy.transferdetails.recipient'
                defaultMessage='Recipient'
              />
            </Title>
            <Value>{props.account.agent.recipient}</Value>
          </Row>
        )}
        <Row>
          <Title>
            <FormattedMessage
              id='modals.simplebuy.transferdetails.amount'
              defaultMessage='Amount to Send'
            />
          </Title>
          <Value>
            {fiatToString({
              unit:
                Currencies[props.order.inputCurrency].units[
                  props.order.inputCurrency
                ],
              value: convertBaseToStandard('FIAT', props.order.inputQuantity)
            })}
          </Value>
        </Row>
      </div>
      <Bottom>
        <Text size='12px' weight={500} color='grey600'>
          <FormattedMessage
            id='modals.simplebuy.transferdetails.sendfundsfrom'
            defaultMessage='Only send funds from a bank account in your name. If not, your deposit could be delayed or rejected.'
          />
        </Text>
        <Button
          fullwidth
          nature='primary'
          data-e2e='closeSBTransferDetails'
          size='16px'
          height='48px'
          onClick={() => props.handleClose()}
        >
          <FormattedMessage
            id='modals.simplebuy.transferdetails.sendfundsfrom'
            defaultMessage='OK'
          />
        </Button>
      </Bottom>
    </Wrapper>
  )
}

export default TransferDetails
