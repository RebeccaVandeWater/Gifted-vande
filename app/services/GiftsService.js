import { AppState } from "../AppState.js"
import { Gift } from "../models/Gift.js"
import { api } from "./AxiosService.js"

class GiftsService {
    async findGift(formData) {
        console.log('form data', formData)
    }
    async createGift(formData) {

        let newGift = new Gift(formData)

        AppState.newGift = newGift

        console.log("My new gift", newGift)

        const res = await api.post('api/gifts', newGift)

        console.log("New gift?", res.data)

        AppState.myGifts.push(newGift)

        AppState.emit('myGifts')
    }

    async loadGifts() {
        const res = await api.get('api/gifts')

        console.log(res.data)

        const newGifts = res.data.map(pojo => new Gift(pojo))

        AppState.myGifts = newGifts

        console.log("New Gifts!", AppState.myGifts)
    }

    async openGift(giftId) {
        let foundGiftIndex = AppState.myGifts.findIndex(g => g.id == giftId)

        let foundGift = AppState.myGifts[foundGiftIndex]

        const res = await api.put(`api/gifts/${giftId}`, { opened: !foundGift.opened })

        console.log(res.data)
    }
}

export const giftsService = new GiftsService