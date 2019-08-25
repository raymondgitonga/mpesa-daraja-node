const express = require('express');
const nodemon = require('nodemon');
const MpesaOnline = require('mpesa-online')
const mpesa = new MpesaOnline()

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//None of the fields should be empty
const params = {
    //The organization shortcode used to receive the transaction.
    'BusinessShortCode': '', 
    //The transaction type to be used for this request.
    'TransactionType': 'CustomerPayBillOnline', 
    //Amount to be charged / paid
    'Amount': '1', 
    //The mobile number sending the funds. When testing use shortcode 1 from https://developer.safaricom.co.ke/test_credentials
    'PartyA': '', 
    // The organization shortcode receiving the funds. When testing use from Lipa Na Mpesa Online Shortcode:
    'PartyB': '', 
    // The mobile number sending the funds.
    'PhoneNumber': '', 
    // The url to where responses from M-Pesa will be sent to.
    'CallBackURL': 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', 
    //Name will display to the one paying
    'AccountReference': '', 
    'TransactionDesc': 'Testing mpesa online',
    //consumer key
    'consumerKey': '', 
    // consumer secret
    'consumerSecret': '', 
    // Used to create a password for use when making a Lipa Na M-Pesa Online Payment API calls generate yours from https://developer.safaricom.co.ke/test_credentials
    'passKey': '', 
    // MPESA authentication end point
    'authenticationURL': 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', 
    // MPESA request processing end point
    'processRequestURL': 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest' 
  }


app.post('/mpesa', (req, res)=>{
    mpesa.mpesaRequest(params, 'processRequest')
    .then(response => console.log(response))
    .catch(error => console.log(error))
})



app.listen(9000, ()=>{
    console.log('Server is running on port 9000....');
});