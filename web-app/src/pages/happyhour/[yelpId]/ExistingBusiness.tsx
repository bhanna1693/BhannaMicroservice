import {Business, SpecialCheckStatus} from "../../../models/business";
import {FunctionComponent, ReactElement} from "react";
import {isToday, parseISO} from 'date-fns';

const ExistingBusiness: FunctionComponent<{
    children: ReactElement,
    business: Business,
}> = ({
          business,
          children
      }) => {

    function hasCheckedForSpecialsToday() {
        return business.latestSpecialsCheck ? isToday(parseISO(business.latestSpecialsCheck)) : false
    }

    switch (business.specialCheckStatus) {
        case SpecialCheckStatus.FAILED:
            return <div className={"text-center"}>
                <h1>We failed to get specials for <br/> {business.name}</h1>
                <p>Try again?</p>
                {children}
            </div>
        case SpecialCheckStatus.COMPLETED:
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
                            {children}
                        </div>
                    )}
                </div>
            }

            return <div>
                <h1>No specials found for {business.name}</h1>
                <h2>Last checked: {business.latestSpecialsCheck}</h2>

                {!hasCheckedForSpecialsToday() ? (
                    <div>
                        {children}
                    </div>
                ) : (
                    <h3>Already checked for specials today. Try again tomorrow.</h3>
                )}
            </div>
        case SpecialCheckStatus.PENDING:
            return <div>
                <h1>We are currently running a check for specials right now</h1>
                <p>This can take some time. Please come back in a minute or two!</p>
            </div>
        case SpecialCheckStatus.INITIAL:
            return <div>
                <h1>We are aware of this business but have not checked for specials.</h1>
                {children}
            </div>
        default:
            return <h1>HOW???</h1>
    }
}

export default ExistingBusiness
