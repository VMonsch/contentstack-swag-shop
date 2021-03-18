import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import {Button, Segment, Divider} from 'semantic-ui-react'

export default ({
  handleCheckout,
  amount
}) => (
  <div>
    <Divider />
    <Segment clearing size="large">
      <span>
        <strong>Sub total:</strong>
        {` ${amount}`} €
      </span>
      <StripeCheckout
        name="Contentstack Swag Shop"
        amount={amount * 100} //seems to be in cents
        currency={'EUR'}
        stripeKey={process.env.STRIPE_PUBLISHABLE_KEY || ''}
        shippingAddress={false}
        billingAddress
        zipCode
        token={handleCheckout}
        reconfigureOnUpdate={false}
        triggerEvent="onClick"
      >
        <Button color="black" floated="right">
          Check out
        </Button>
      </StripeCheckout>
    </Segment>
  </div>
)
