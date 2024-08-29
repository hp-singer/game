from telegram import Update
from telegram.ext import Updater, CommandHandler, CallbackContext

# Замените 'YOUR_BOT_TOKEN' на токен вашего бота
BOT_TOKEN = '6691882375:AAEWAScldwc4R4O_YvFIPiqwNH5o3F7NUT8'

# Замените 'YOUR_GAME_URL' на URL, где размещена ваша игра
GAME_URL = 'https://hp-singer.github.io/game.github.io/'

def start(update: Update, context: CallbackContext):
    # Отправка приветственного сообщения
    update.message.reply_text("Welcome to the Game Bot! Click the link below to play:")
    # Отправка ссылки на игру
    update.message.reply_text(f"Play the game: {GAME_URL}")

def main():
    updater = Updater(BOT_TOKEN, use_context=True)
    dp = updater.dispatcher

    dp.add_handler(CommandHandler("start", start))

    # Запуск бота
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
