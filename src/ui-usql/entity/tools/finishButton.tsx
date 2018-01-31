import * as React from 'react';
import {Button} from 'reactstrap';

export const FinishButton = ({onClick}) => 
    <Button size='sm' color='success' onClick={onClick}>完成</Button>;

