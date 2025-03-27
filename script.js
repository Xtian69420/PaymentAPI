document.getElementById('payment-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const amountInput = document.getElementById('amount');
    const amount = amountInput.value;

    if (!amount || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    try {
        const response = await fetch('https://api.paymongo.com/v1/links', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': 'Basic ' + btoa('sk_live_3XPQRNFVb5cHTeK46Jh2AXCG:'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: {
                    attributes: {
                        amount: amount * 100, 
                        description: 'Reservation',
                        remarks: 'Payment',
                    },
                },
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('API Error:', errorData); 
            alert('Error: ' + errorData.errors[0].detail);
            return;
        }

        const data = await response.json();
        console.log('API Response:', data); 
        console.log('Data:', data.data); 
        console.log('Attributes:', data.data.attributes); 

        
        const paymentLink = data.data.attributes.checkout_url;

        if (paymentLink) {
            window.location.href = paymentLink; 
        } else {
            alert('Payment link not found. Please check the response data.');
        }

    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});
