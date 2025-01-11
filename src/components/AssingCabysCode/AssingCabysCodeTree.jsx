import { Scrollbars } from 'react-custom-scrollbars';
import DropdownTreeSelect from 'react-dropdown-tree-select'
import 'react-dropdown-tree-select/dist/styles.css'

import { cabyscode } from '../../helpers/cabyscodeData'

export const AssingCabysCodeTree = () => {

    // const data = cabyscode;

    const onChange = (currentNode, selectedNodes) => {
        console.log('onChange::', currentNode, selectedNodes)
    }

    const onAction = (node, action) => {
        console.log('onAction::', action, node)
    }

    const onNodeToggle = currentNode => {
    console.log('onNodeToggle::', currentNode)
    }

    return (
        <div className='txtBuscarACCModal'>
            <Scrollbars style={{ width: 1000, height: 330 }}>
                <DropdownTreeSelect 
                    data={cabyscode} 
                    onChange={onChange} 
                    onAction={onAction} 
                    onNodeToggle={onNodeToggle}
                    texts={{ placeholder: 'Buscar Código Cabys' }}
                />
            </Scrollbars>
        </div>
    )
}
