const express = require('express');
const nodemon = require('nodemon');
const MpesaOnline = require('mpesa-online')
const mpesa = new MpesaOnline()

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//None of the fields should be empty
const params = {
    'BusinessShortCode': '',  //The organization shortcode used to receive the transaction.
    
    'TransactionType': 'CustomerPayBillOnline', //The transaction type to be used for this request.
    
    'Amount': '1', //Amount to be charged / paid
    
    'PartyA': '', //The mobile number sending the funds. When testing use shortcode 1 from https://developer.safaricom.co.ke/test_credentials
    
    'PartyB': '', // The organization shortcode receiving the funds. When testing use from Lipa Na Mpesa Online Shortcode:
    
    'PhoneNumber': '', // The mobile number sending the funds.
    
    'CallBackURL': 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', // The url to where responses from M-Pesa will be sent to.
    
    'AccountReference': '', //Name will display to the one paying
    
    'TransactionDesc': 'Testing mpesa online', //Description of transaction
    
    'consumerKey': '', // your consumer key
    
    'consumerSecret': '', // your consumer secret
    
    'passKey': '', // Used to create a password for use when making a Lipa Na M-Pesa Online Payment API calls generate yours from https://developer.safaricom.co.ke/test_credentials
    
    'authenticationURL': 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', // MPESA authentication end point
    
    'processRequestURL': 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest' // MPESA request processing end point
  }


app.post('/mpesa', (req, res)=>{
    mpesa.mpesaRequest(params, 'processRequest')
    .then(response => console.log(response))
    .catch(error => console.log(error))
})



app.listen(9000, ()=>{
    console.log('Server is running on port 9000....');
});