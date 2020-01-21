import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';

export interface IMessage {
    sentAt: string,
    senderUuid: string,
    index: number,
    deleteMessage(id: number): void
}

const Message: React.FC<IMessage> = ({ senderUuid, sentAt, index, deleteMessage }) => {
    const  formatTime = () => {
        // change string to date object
        const date = new Date(sentAt)

        // provide options to formate date string
        var options = {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };

        // build final resultDate string
        var _resultDate = new Intl.DateTimeFormat('en-US', options).format(date);

        // return resultDate string
        return (_resultDate);
    }

    return (
        <Card {...index}>
            <Card.Content>
                <Card.Header>
                    Sender Uuid
                </Card.Header>
                <Card.Description>
                    {senderUuid}
                </Card.Description>
                <Card.Header>
                    {formatTime()}
                </Card.Header>
                <Card.Description>
                    {sentAt}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button icon onClick={() => deleteMessage(index)}>
                    <Icon name="delete" />
                </Button>
            </Card.Content>
        </Card>
    );
}

export default Message;