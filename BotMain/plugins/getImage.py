import aiohttp
from botpy import logging

_log = logging.get_logger()

class Get:
    @staticmethod
    async def download_image(url):
        async with aiohttp.ClientSession() as session:
            async with session.get(url) as response:
                if response.status == 200:
                    _log.info('文件下载成功，请调用下载api使用！')
                    # Return the binary content of the image
                    return await response.read()
                else:
                    _log.warning("下载失败！")
                    return None
