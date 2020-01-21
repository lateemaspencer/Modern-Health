import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';

export interface IMessage {
    sentAt: string,
    senderUuid: string,
    index: number,
    deleteMessage(id: number): void
}

const Message: React.FC<IMessage> = ({ senderUuid, sentAt, index, deleteMessage }) => {
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
                    SentAt
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