import {Business} from "../../../models/business";
import {FunctionComponent} from "react";
import {isToday, parseISO} from 'date-fns';

const SpecialDetailsList: FunctionComponent<{
    business: Business,
}> = ({
          business,
      }) => {

    function hasCheckedForSpecialsToday() {
        return business.latestSpecialsCheck ? isToday(parseISO(business.latestSpecialsCheck)) : false
    }


    if (business.specialDetailList.length) {
        return <div>
            <h1>{business.name}</h1>
            <ul>
                {business.specialDetailList.map(special => {
                    return <li key={special.id}>
                        <div>Type: {special.type}</div>
                        <div>Day: {special.daysOfTheWeek}</div>
                        <div>Time: {special.operatingHours}</div>
                        <div>Details: {special.description}</div>
                    </li>
                })}
            </ul>

            {/* Optionally show option to recheck specials */}
            {!hasCheckedForSpecialsToday() && (
                <div>
                    <h2>Last checked: {business.latestSpecialsCheck}</h2>
                </div>
            )}
        </div>
    }

    return <div>
        <h1>No specials found for {business.name}</h1>
        <h2>Last checked: {business.latestSpecialsCheck}</h2>

        {!hasCheckedForSpecialsToday() ? (
            <div>
            </div>
        ) : (
            <h3>Already checked for specials today. Try again tomorrow.</h3>
        )}
    </div>
}

export default SpecialDetailsList
