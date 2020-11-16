const getHealth = () => {
  return {
    status: 200,
    message: 'Ok',
    location: process.env.LOCATION,
    date: new Date()
  }
}

module.exports = getHealth;
