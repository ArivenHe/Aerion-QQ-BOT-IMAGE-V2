import ssl
import aiohttp
import os
import botpy
import asyncio
from botpy import logging
from botpy.ext.cog_yaml import read
from botpy.ext.command_util import Commands
from botpy.message import GroupMessage
import aiofiles
from plugins.getImage import Get

# 创建 SSL 上下文以忽略证书验证
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

# 读取配置文件
test_config = read(os.path.join(os.path.dirname(__file__), "./config/config.yaml"))
_log = logging.get_logger()


@Commands('气象')
async def image(api: botpy.BotAPI, message: GroupMessage, params=None):
    _log.info(params)
    if not params or len(params) < 4:
        _log.warning("缺少必要的参数。")
        return

    _log.info(f"接收到的参数: {params}")
    _log.info("开始请求api。")

    url = f'https://YOUR_BOT_SERVER_URL?icao={params}'
    imageUrl=f'https://YOUR_BOT_SERVER_URL/{params}_weather_screenshot.png'
    image_data = await Get.download_image(url)

    if image_data:
        try:
            # Upload the image directly from memory (no local file)
            upload_media = await api.post_group_file(
                group_openid=message.group_openid,
                file_type=1,  # Assuming file_type 1 is for images
                url=imageUrl  # Pass the binary data directly
            )

            # Send the uploaded media in the group message
            await api.post_group_message(
                group_openid=message.group_openid,
                msg_type=7,  # Assuming msg_type 7 is for media messages
                msg_id=message.id,
                media=upload_media,
                msg_seq=3
            )

        except botpy.errors.ServerError as e:
            _log.error(f"文件上传失败: {e}")
        except Exception as e:
            _log.error(f"发生错误: {e}")
    else:
        _log.warning("无法下载图像，无法上传。")

@Commands('航路')
async def route(api: botpy.BotAPI, message: GroupMessage, params=None):
    _log.info(params)
    if not params or len(params) < 4:
        _log.warning("缺少必要的参数。")
        return

    def split_params(params):
        if ' ' in params:
            return params.split()
        elif len(params) == 8:  # Assuming params is a concatenated string like "ZBAAZSPD"
            return params[:4], params[4:]
        else:
            raise ValueError("Invalid params format")


    _log.info(f"接收到的参数: {params}")
    dep_icao, arr_icao = split_params(params)
    _log.info("开始请求api。")

    url = f'https://YOUR_BOT_SERVER_URL/route?dep={dep_icao}&app={arr_icao}'
    imageUrl=f'https://YOUR_BOT_SERVER_URL/image/{params}_route_screenshot.png'
    image_data = await Get.download_image(url)

    if image_data:
        try:
            # Upload the image directly from memory (no local file)
            upload_media = await api.post_group_file(
                group_openid=message.group_openid,
                file_type=1,  # Assuming file_type 1 is for images
                url=imageUrl  # Pass the binary data directly
            )

            # Send the uploaded media in the group message
            await api.post_group_message(
                group_openid=message.group_openid,
                msg_type=7,  # Assuming msg_type 7 is for media messages
                msg_id=message.id,
                media=upload_media,
                msg_seq=3
            )

        except botpy.errors.ServerError as e:
            _log.error(f"文件上传失败: {e}")
        except Exception as e:
            _log.error(f"发生错误: {e}")
    else:
        _log.warning("无法下载图像，无法上传。")

class MyClient(botpy.Client):
    async def on_ready(self):
        _log.info(f"机器人「{self.robot.name}」已准备就绪！")

    async def on_group_at_message_create(self, message: GroupMessage):
        _log.info(f"收到群消息： {message.content}")
        content = message.content.strip()
        if content.startswith('/'):
            command, *params = content[1:].split(maxsplit=1)
            params = params[0].split() if params else []
            _log.info(f"收到命令：{command}，带有参数：{params}")

            handlers = [image,route]
            for handler in handlers:
                if await handler(api=self.api, message=message, params=params):
                    _log.info(f"处理程序 {handler.__name__} 处理了该消息。")
                    return
        else:
            _log.warning(f"收到非命令消息：{content}")

if __name__ == "__main__":
    intents = botpy.Intents(public_messages=True)
    client = MyClient(intents=intents)
    _log.info("正在启动机器人...")
    _log.info("Made by Flyuion Ariven, GPL 3.0 - Opened.")
    client.run(appid=test_config["appid"], secret=test_config["secret"])
