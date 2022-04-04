import React from "react";
import Link from "next/link";

const DetailItem = ({title, value, link}) => {
    return (
        <>
            {value &&
            link ?
                <div className={'flex pt-5'}>
                    <p className={'w-1/6 font-bold'}>{title}:</p>
                    <p className={'w-full'}>
                        <Link href={value}>
                            <a target="_blank" rel="noreferrer">
                                {value}
                            </a>
                        </Link>
                    </p>
                </div> :
                <div className={'flex pt-5'}>
                    <p className={'w-1/6 font-bold'}>{title}:</p>
                    <p className={'w-full'}>{value}</p>
                </div>

            }
        </>
    );
};

export default DetailItem;
