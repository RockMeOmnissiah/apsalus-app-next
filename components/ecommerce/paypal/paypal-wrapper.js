import { PAYPAL_CLIENT_ID } from '../../../utils/constants';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function PaypalWrapper({innerContent}) {
  return (
    <PayPalScriptProvider options= {{
        "client-id": PAYPAL_CLIENT_ID,
        components: "buttons,funding-eligibility",
				"enable-funding": "venmo",
      }}>
      {innerContent}
    </PayPalScriptProvider>
  );
}
