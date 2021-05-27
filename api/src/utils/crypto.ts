import CryptoJS from 'crypto-js'
import { config } from '../config'

export function encrypt (data: string) { CryptoJS.AES.encrypt(data, config.cryptoKey) }

export function decrypt (data: string) { CryptoJS.AES.decrypt(data, config.cryptoKey) }