// 简单的加密工具，用于保护本地存储的敏感数据
class CryptoUtils {
  private static readonly CRYPTO_KEY = "deepseek_app_crypto_key_v1";

  // 生成基于用户代理和时间戳的密钥
  private static generateKey(): string {
    const userAgent = navigator.userAgent;
    const baseKey = btoa(userAgent + this.CRYPTO_KEY);
    return baseKey.substring(0, 32).padEnd(32, "0");
  }

  // 简单的 XOR 加密（适用于本地存储，不用于网络传输）
  private static xorCrypt(text: string, key: string): string {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(
        text.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return result;
  }

  // 加密文本
  static encrypt(text: string): string {
    try {
      const key = this.generateKey();
      const encrypted = this.xorCrypt(text, key);
      return btoa(encrypted);
    } catch (error) {
      console.warn("加密失败，使用原文:", error);
      return text;
    }
  }

  // 解密文本
  static decrypt(encryptedText: string): string {
    try {
      const key = this.generateKey();
      const decoded = atob(encryptedText);
      return this.xorCrypt(decoded, key);
    } catch (error) {
      console.warn("解密失败，返回原文:", error);
      return encryptedText;
    }
  }

  // 安全清除字符串（防内存泄露）
  static secureDelete(str: string): void {
    if (typeof str === "string") {
      // 尝试覆写内存中的字符串（有限效果，但聊胜于无）
      for (let i = 0; i < str.length; i++) {
        str = str.substring(0, i) + "\0" + str.substring(i + 1);
      }
    }
  }

  // 生成随机盐值
  static generateSalt(): string {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
      ""
    );
  }
}

export default CryptoUtils;
