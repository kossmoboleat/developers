const getUrl = () => process.env.GATSBY_TARGET_ENV !== 'production'
  ? 'https://api.uport.space/chasqui/'
  : 'https://api.uport.me/chasqui/'

export default getUrl()
