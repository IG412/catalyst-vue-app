import ky from 'ky'

export function makeApiClient() {
  return ky.extend()
}
