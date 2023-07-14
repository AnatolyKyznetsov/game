import { expressCspHeader, SELF, INLINE } from 'express-csp-header'

const isDev = () => process.env.NODE_ENV === 'development'

export const cspMiddleware = () =>
    expressCspHeader({
        directives: isDev()
            ? {}
            : {
                  'default-src': [
                      SELF,
                      'https://ya-praktikum.tech/api/v2',
                      'http://localhost:3000',
                      'https://ya-praktikum.tech/api/v2/oauth/yandex/service-id',
                      'https://ya-praktikum.tech/api/v2/auth/user',
                      'http://game-machine.ya-praktikum.tech',
                  ],
                  'font-src': [
                      SELF,
                      'https://fonts.googleapis.com/',
                      'https://fonts.gstatic.com/',
                  ],
                  'img-src': [SELF, 'data:', 'https://ya-praktikum.tech'],
                  'script-src': [SELF, INLINE],
                  'style-src': [SELF, INLINE, 'https://fonts.googleapis.com/'],
              },
    })
