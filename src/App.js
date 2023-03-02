import React, {useState} from 'react';
import './index.scss';
import {Success} from './components/Success';
import {Users} from './components/Users';

const App = () => {

    const [users, setUsers] = useState([]);
    const [invites, setInvites] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    React.useEffect(() => {
        fetch('https://reqres.in/api/users')
            .then((response) => response.json())
            .then((json) => {
                setUsers(json.data);
            }).catch((error) => {
            console.warn(error);
            alert('Ошибка при запросе списка пользователей!')
        }).finally(() => {
            setLoading(false);
        })

    }, [])

    const onChangeSearchValue = (event) => {
        setSearchValue(event.target.value);
    }

    const onClickInvite = (id) => {
        if (invites.includes(id)) {
            setInvites((prev) => prev.filter((_id) => _id !== id));
        } else {
            setInvites((prev) => [...prev, id]);
        }
    }

    const onClickSentInvites = () => {
        setSuccess(true);
    }

    return (
        <div className="App">
            {success ?
                (<Success count={invites.length}/>
                ) : (
                    <Users searchValue={searchValue}
                           onChangeSearchValue={onChangeSearchValue}
                           items={users}
                           isLoading={isLoading}
                           onClickInvite={onClickInvite}
                           invites={invites}
                           onClickSentInvites={onClickSentInvites}/>
                )}
        </div>
    );
}

export default App;
