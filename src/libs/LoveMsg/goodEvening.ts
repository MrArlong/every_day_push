/**
 * @name goodEvening
 * @description 说晚安
 */
import API from '../../api/loveMsg'
import { wxNotify } from '../WxNotify'
import { newsTemplate } from './templates/news'
import {textCardTemplate} from "./templates/textcard";
import {getConfig} from "../../utils/getConfig";
import {mananaTextCardTemplate} from "./templates/mananaTextcard";

const CONFIG = getConfig().loveMsg

// 明日天气信息
const mananaWeather = async () => {
  try {
    const weather = await API.getMananaWeather(CONFIG.city_name)
    if (weather) {
      const lunarInfo = await API.getLunarDate(weather.date)
      const template = mananaTextCardTemplate({ ...weather, lunarInfo })
      console.log('mananaWeatherInfo', template)

      // 发送消息
      await wxNotify(template)
    }
  } catch (error) {
    console.log('weatherInfo:err', error)
  }
}

// 获今日取故事 
const getStory = async() => {
  const res = await API.getStorybook()
  const template = {
    msgtype: 'text',
    text: {
      content: `给臭臭的今日份睡前故事来喽：
🌑🌒🌓🌔🌕🌝😛\n
『${res.title}』
${res.content}`,
    },
  }
  console.log('getStory', template)
  await wxNotify(template)
}

// 执行函数
export const goodEvening = async() => {
  await mananaWeather()
  //await getStory()
}
