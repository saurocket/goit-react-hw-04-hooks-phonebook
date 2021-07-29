import React, {useEffect, useState} from 'react'
import {Header} from "./Header/Header";
import {Form} from "./From/From";
import { ContactsPage } from './ContacstPage/ContactsPage';


export type ContactType = {
    id: string,
    name: string,
    number: string,
}


export type IState = {
    contacts: Array<ContactType>
    filter: string
    name: string
    number: string
}

export const MainPage  = () =>  {

    const [state, setState] = useState<IState>({
        contacts: [
            {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
            {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
            {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
            {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
        ],
        filter: '',
        name: '',
        number: ''
    })
    useEffect(() => {
        const constants = localStorage.getItem('contacts')
        if (constants){
            const parseContacts = JSON.parse(constants) as Array<ContactType>
            setState(
                {...state, contacts: [...parseContacts]}
            )
        }
    },[])

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(state.contacts))
    },[state.contacts])

    const onChangeName = (value: string) => {
       setState(prevState => {
           return {...prevState, name: value}
       })
    }
    const onChangePhone = (value: string) => {
       setState(preState => {
           return {...preState, number: value}
       })
    }
    const onChangeFilter = (value: string) => {
        setState(preState => {
            return {...preState, filter: value}
        })
    }
    const onSubmitForm = (data: ContactType) => {
       setState(prevState => {
           return (
               {...prevState, contacts: [...prevState.contacts, data]}
           )
       })
    }
    const  onDeleteContact = (id: string) => {
        setState(prevState => {
           return {...prevState, contacts: [...prevState.contacts.filter(item => item.id !== id)]}
       })
    }
    const onCheckContactList = (name:string) => {
       return (state.contacts.find(item => item.name === name))
    }
        return (
            <>
                <Header text='PhoneBook'/>
                <Form
                 onCheckContactList={onCheckContactList}
                onSubmitForm={onSubmitForm}
                name={state.name}
                phone={state.number}
                onChangeName={onChangeName}
                onChangePhone={onChangePhone}
                />
                <ContactsPage
                    filter={state.filter}
                    onChangeFilter={onChangeFilter}
                    contacts={state.contacts}
                    onDeleteContact={onDeleteContact}
                />
            </>
        )

}