
export async function getAllUsers() {

    try{
        const response = await fetch('/api/invoices');
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

export async function createUser(data) {
    const response = await fetch(`/api/user`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
      })
    return await response.json();
}

export async function sendMail(data) {
    const response= await fetch('/api/sendMail', {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({mailData:data})
    })
    return await response.json();
}

export async function updateStatus(status, invoiceNumber) {
    const response = await fetch('/api/updateStatus',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({status:status,invoiceNumber:invoiceNumber})
    })
    return await response.json();
}