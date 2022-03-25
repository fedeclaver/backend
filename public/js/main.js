
(async () => {
    let res = await fetch('/getuser', {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${localStorage.getItem('access_token')}`
        }
      });    
    if (res.status != 200) {
        return location.href = '/login'
    }
})()

