import * as signalR from "@microsoft/signalr"
import { hubBaseUrl, sessionStorageKey } from '@/utils/global'
import store from '@/store'

export function startBroadcastHubConnection()
{
    let connection = new signalR.HubConnectionBuilder()
                                .withUrl(hubBaseUrl + "api/broadcastHub")
                                .build()

    connection.on("HubEcho", function () { 

        console.log("HubEcho")

        let currentBroadcastHubConnectionId = sessionStorage.getItem(sessionStorageKey.broadcastHubConnectionId)
        connection.invoke("UpdateCurrentOnlineUser", currentBroadcastHubConnectionId).catch(function (err) {
            console.log(err.toString());
        })
    })

    connection.on("ReceiveMessage", function (messageJson) { 

        let messages = JSON.parse(messageJson)

        store.commit('addNoReadMessage', messages)

        console.log('messageJson')
        console.log(messageJson)
        console.log('messages')
        console.log(messages)

    });

    connection.start().then(function () {

        sessionStorage.setItem(sessionStorageKey.broadcastHubConnectionId, connection.connection.connectionId)

        console.log('connectionId')
        console.log(connection.connection.connectionId)

        connection.invoke("CheckTimersStatus").catch(function (err) {
            console.log(err.toString())
        })

        let currentBroadcastHubConnectionId = sessionStorage.getItem(sessionStorageKey.broadcastHubConnectionId)
        connection.invoke("UpdateCurrentOnlineUser", currentBroadcastHubConnectionId).catch(function (err) {
            console.log(err.toString())
        })

    }).catch(function (err) {
        console.log(err.toString());
    });

    // connection.on("ReceiveMessage", function (user, message) { 
    //     console.log(user + " : " + message)
    // });

    // connection.start().then(function () {
    //     connection.invoke("createTimer").catch(function (err) {
    //         console.log(err.toString());
    //     });
    // }).catch(function (err) {
    //     console.log(err.toString());
    // });
}