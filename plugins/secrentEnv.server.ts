import { SecretManagerServiceClient } from '@google-cloud/secret-manager'

export default defineNuxtPlugin(async () => {
  if (process.env.NODE_ENV === 'production') {
    // Crear cliente de Secret Manager
    const client = new SecretManagerServiceClient()

    // El nombre completo del secreto (proyecto, secreto y versión)
    const [strapiApiToken] = await client.accessSecretVersion({
      name: 'projects/bogdev-437223/secrets/STRAPI_API_TOKEN/versions/latest',
    })

    const [StrapiUrl] = await client.accessSecretVersion({
      name: 'projects/bogdev-437223/secrets/STRAPI_URL/versions/latest',
    })

    // El secreto está codificado en Base64
    const payloadStrapiApiToken = strapiApiToken.payload?.data?.toString() || ''
    const payloadStrapiApiUrl = StrapiUrl.payload?.data?.toString() || ''

    // Acceder al runtimeConfig de Nuxt
    const config = useRuntimeConfig()

    // Asignar el valor del secreto al runtimeConfig
    config.strapiToken = payloadStrapiApiToken
    config.strapi.url = payloadStrapiApiUrl
    config.public.strapi.url = payloadStrapiApiUrl
  }
})
