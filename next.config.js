/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // para poder mostrar las imagenes de forma estatica
  images: {
    // dominios para permitir imagenes
    domains: ['raw.githubusercontent.com']
  }
}

module.exports = nextConfig
