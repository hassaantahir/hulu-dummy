import React from 'react';
import {attachApiKey} from "../../utils/requests";
import Link from "next/link";
import Image from "next/image";
import DetailItem from "../../components/DetailItem";
import {convertToInternationalCurrencySystem} from "../../utils/helperFunctions";
import moment from "moment";

const MovieDetail = ({detail}) => {
    const BASE_URL = "https://image.tmdb.org/t/p/original";

    return (
        <>
            {detail.title ?
                <div className={'p-2 group grid grid-cols-2 gap-4 py-20 mx-16'}>
                    <Link href={`/detailPage/${detail?.id}`}>
                        <Image
                            className={'rounded-3xl'}
                            layouts={'responsive'}
                            src={
                                `${BASE_URL}${detail?.backdrop_path}` ||
                                `${BASE_URL}${detail?.poster_path}` ||
                                detail.poster_path
                            }
                            alt={"Poster Image"}
                            height={1080}
                            width={1920}
                        />
                    </Link>

                    <div className={'p-2 pt-0'}>
                        <h2 className={'mt-1 text-5xl text-white font-bold'}>
                            {detail.title || detail.original_name}
                        </h2>
                        {detail.overview &&
                            <DetailItem title={'Overview'} value={detail.overview}/>
                        }
                        {detail?.genres &&
                            <div className={'flex pt-2 2xl:pt-5'}>
                                <p className={'w-1/5 font-bold'}>Genre:</p>
                                <p className={'w-full'}>
                                    {detail?.genres.map((item, index) => {
                                        return detail?.genres.length === index + 1 ? item.name : `${item.name}, `
                                    })}
                                </p>
                            </div>
                        }
                        {detail?.homepage &&
                            <DetailItem title={'Website'} value={detail?.homepage} link/>
                        }
                        {detail?.imdb_id &&
                            <DetailItem
                                title={'IMDB Link'} value={`https://imdb.com/title/${detail?.imdb_id}`}
                                link
                            />
                        }
                        {(detail.budget || detail.budget != '0') &&
                            <DetailItem
                                title={'Budget'}
                                value={'$' + convertToInternationalCurrencySystem(detail.budget)}
                            />
                        }
                        {detail.release_date &&
                            <DetailItem title={'Release Date'}
                                        value={moment(detail.release_date, 'YYYY-MM-DD').format('LL')}/>
                        }
                        {detail.runtime &&
                            <DetailItem title={'Play Time'} value={`${detail.runtime} minutes`}/>
                        }
                        {detail.status &&
                            <DetailItem title={'Movie Status'} value={detail.status}/>
                        }
                        {detail.vote_average &&
                            <DetailItem title={'Rating'} value={`${detail.vote_average}/10`}/>
                        }
                    </div>
                </div> :
                <h1 className={'flex justify-center items-center h-80 text-5xl'}>Detail Page Not Found</h1>
            }
        </>
    );
};

export default MovieDetail;


export async function getServerSideProps(context) {
    const id = context.query.id;

    const request = await fetch(
        `https://api.themoviedb.org/3/movie/${id}${attachApiKey}`
    ).then((res) => res.json())
        .catch((error) => console.log('error=> ', error));

    return {
        props: {
            detail: request,
        }
    }
}
