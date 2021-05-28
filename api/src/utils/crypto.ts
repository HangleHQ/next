import CryptoJS from 'crypto-js'
import { config } from '../config'

export function encrypt (data: string) { return CryptoJS.AES.encrypt(data, config.cryptoKey).toString() }

export function decrypt (data: string) { return CryptoJS.AES.decrypt(data, config.cryptoKey).toString() }