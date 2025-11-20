export interface ChatMessage {
    name: string, // Nama pengirim
    email : string, // Email pengirim
    message: string, // Pesan
    recipientId?: number | string, // ID penerima (optional, bisa undefined untuk "all")
    recipientEmail: string, // Email penerima
    recipientName: string, // Nama penerima
}

export const chatMessage: ChatMessage[];