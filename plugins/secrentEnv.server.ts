import { SecretManagerServiceClient } from '@google-cloud/secret-manager'

export default defineNuxtPlugin(async () => {
  if (process.env.NODE_ENV === 'production') {
    const client = new SecretManagerServiceClient()
    const [strapiApiToken] = await client.accessSecretVersion({
      name: 'projects/bogdev-437223/secrets/STRAPI_API_TOKEN/versions/latest',
    })
    const [StrapiUrl] = await client.accessSecretVersion({
      name: 'projects/bogdev-437223/secrets/STRAPI_URL/versions/latest',
    })

    const payloadStrapiApiToken = strapiApiToken.payload?.data?.toString() || ''
    const payloadStrapiApiUrl = StrapiUrl.payload?.data?.toString() || ''
    const config = useRuntimeConfig()
    config.strapiToken = payloadStrapiApiToken
    config.strapi.url = payloadStrapiApiUrl
    config.public.strapi.url = payloadStrapiApiUrl
  }
})
