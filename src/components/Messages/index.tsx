import React, { useState, useEffect } from 'react';
import { Card, Pagination } from 'semantic-ui-react';

import Message from './Message';
// This is the list of messages.
import { messages } from '../../data.json';

export interface IMessage {
    sentAt: string,
    uuid: string,
    content: string,
    senderUuid: string
}

export interface IPageInfo {
    activePage: number
}

const Messages: React.FC<{}> = () => {
    const [message, setMessages] = useState<Array<IMessage> | undefined>([]);
    const [activePage, setActivePage] = useState(1);

    // Set length for pagination
    const totalPages = message ? Math.ceil(message.length / 5) : '';

    // Initial setup of data
    useEffect(() => {
        const removeDuplicates = () => {
            return messages.filter((current, i, messages) => {
                if (current) {
                    return messages.findIndex((value) => {
                        if (value) {
                            return (value.uuid === current.uuid && value.content === current.content)
                        }
                    }) === i;
                }
                return;
            });
        }
        setMessages(removeDuplicates());
    }, []);

    // Order messages in Ascending Order
    const handleAsc = (event: React.MouseEvent<HTMLElement>): void => {
        if (message) {
            const sorted = [...message].sort((a, b) => {
                const dateA: any = new Date(a.sentAt),
                    dateB: any = new Date(b.sentAt);
                return dateA - dateB;
            });
            setMessages(sorted);
        }
    };

    // Order Messages in Descending order
    const handleDesc = (event: React.MouseEvent<HTMLElement>): void => {
        if (message) {
            const sorted = [...message].sort((a, b) => {
                const dateA: any = new Date(a.sentAt),
                    dateB: any = new Date(b.sentAt);
                const descending = (dateA - dateB) * -1;
                return descending;
            });
            setMessages(sorted);
        }
    };

    // Delete Specific Message
    const deleteMessage = (id: number) => {
        if (message) {
            const messages = [...message];
            messages.splice(id, 1);
            setMessages(messages);
        }
    }

    const getMessages = () => {
        // Set initial Messages to first 5 messages
        // Also, grab the next 5 messages on click
        const itemsPerPage = 5;
        if (message) {
            const items = message.slice(
                (activePage - 1) * itemsPerPage,
                (activePage - 1) * itemsPerPage + itemsPerPage
            );
            return items.map((current: IMessage, key: number) => {
                return < Message {...current} key={key} deleteMessage={deleteMessage} index={key} />
            }
            )
        }
    }

    const onChangeActivePage = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, pageInfo: any) => {

        const { activePage } = pageInfo
        setActivePage(activePage);
    };

    return (
        <>
            <h1>Messages</h1>
            <button className="ui basic button" onClick={handleAsc}>
                <i className="sort amount up icon"></i>
                Sort Ascending
            </button>
            <button className="ui right labeled icon button" onClick={handleDesc}>
                <i className="sort amount down icon"></i>
                Sort Descending
            </button>

            <Card.Group itemsPerRow={5}>
                {getMessages()}
            </Card.Group>
            <Pagination
                activePage={activePage}
                onPageChange={onChangeActivePage}
                totalPages={totalPages}
                ellipsisItem={null}
            />
        </>
    );
}

export default Messages;