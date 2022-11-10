import PropTypes from 'prop-types';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import toStringDate from './Utils';

const SubItemWeather = ({ weatherInfo }) => {
    const toolTip = content => <Tooltip>{content}</Tooltip>;

    return (
        <div>
            <OverlayTrigger
                delay={{ show: 300, hide: 450 }}
                placement='right'
                overlay={toolTip(toStringDate(weatherInfo.timeStamp))}
            >
                <div className='sub__item'>
                    <div>
                        <i>
                            <b>Location</b>
                            {': '}
                            <label>{weatherInfo.location}</label>
                        </i>
                    </div>
                    <div>
                        <i>
                            <b>Temperature</b>
                            {': '}
                            <label>{weatherInfo.currentTemperature}</label>
                        </i>
                    </div>
                    <div>
                        <i>
                            <b>High/Low Temperature</b>
                            {': '}
                            <label>{weatherInfo.highLowTemperature}</label>
                        </i>
                    </div>
                    <div>
                        <i>
                            <b>Condition</b>
                            {': '}
                            <label>{weatherInfo.condition}</label>
                        </i>
                    </div>
                    <div>
                        <i>
                            <b>Wind</b>
                            {': '}
                            <label>{weatherInfo.wind}</label>
                        </i>
                    </div>
                    <div>
                        <i>
                            <b>Humidity</b>
                            {':  '}
                            <label>{weatherInfo.humidity}</label>
                        </i>
                    </div>
                    <div>
                        <i>
                            <b>Moon Phase</b>
                            {':  '}
                            <label>{weatherInfo.moonPhase}</label>
                        </i>
                    </div>
                </div>
            </OverlayTrigger>
        </div>
    );
};

SubItemWeather.propTypes = {
    weatherInfo: PropTypes.object,
};

export default SubItemWeather;
