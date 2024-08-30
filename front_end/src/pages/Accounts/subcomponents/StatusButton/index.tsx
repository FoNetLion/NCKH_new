import React, { useState } from 'react';
import { Button } from 'antd';
import Status from '../../../../components/Status';
import './styles.scss';
import { Account } from '../../../../constants/types/common.type';
import { useNavigate } from 'react-router-dom';


export type StatusButtonProps = {
   data: Account,
   to?: string | undefined,
   detail?: boolean,
   remove?: boolean
}
const StatusButton: React.FC<StatusButtonProps> = ({data, to = undefined, detail, remove}) => {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const rederButton = () => {
    if(detail){
      return (<Button size='small' className='detailButton' onClick={() => navigate(String(to))}>Chi tiết</Button>)
    }
    if(remove){
      return (<Button size='small' className='removeKeyButton' onClick={() => navigate(String(to))}>Xóa key</Button>)
    }
  }
 
  return (
    <div onMouseLeave={() => setIsHovering(false)} >
      {
        isHovering ?
          <>{rederButton()}</>
          :
          <Status status={data.status} onMouseEnter={() => setIsHovering(true)} />
      }
    </div>
  )
}

export default StatusButton