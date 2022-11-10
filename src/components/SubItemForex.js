import PropTypes from 'prop-types';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import toStringDate from './Utils';

const SubItemForex = ({ forexInfo }) => {
    const displayLabel = text =>
        text.slice(0, 3) + ' to ' + text.slice(3, text.length);

    const toolTip = content => <Tooltip>{content}</Tooltip>;

    return (
        <div>
            <OverlayTrigger
                delay={{ show: 300, hide: 450 }}
                placement='right'
                overlay={toolTip(toStringDate(forexInfo.timeStamp))}
            >
                <div className='sub__item'>
                    {forexInfo.data.map(forex => {
                        return (
                            <div key={forex[0]}>
                                <i>
                                    <b>{displayLabel(forex[0])}</b>
                                    {': '}
                                    <label>{forex[1].rate}</label>
                                </i>
                            </div>
                        );
                    })}
                </div>
            </OverlayTrigger>
        </div>
    );
};

SubItemForex.propTypes = {
    forexInfo: PropTypes.object,
};

export default SubItemForex;
