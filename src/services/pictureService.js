import { baseUrl, getAuthHeader } from "./serviceHelpers"

export const createGamePicture = (pictureData) => {
    return fetch(`${baseUrl}/gamepictures`, {
        method: 'POST',
        headers: getAuthHeader(),
        body: JSON.stringify(pictureData)
    }).then(r => r.json())
}
