const baseUrl = 'https://api.telegram.org/bot7415880234:AAFodY4VV7VFbCcNOlSZWzGAmC-fndgWU10/'

export const sendMessage = async (mes: any):Promise<void> => {
 const url = `${baseUrl}sendMessage?chat_id=-4158071464&text=${mes}`
 const res = await fetch(url)
 console.log(res)
}
