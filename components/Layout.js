import Header from "./Header";
import Nav from "./Nav";
import Head from "next/head";

const Layout = ({children}) => {
    return (
        <div className={''}>
            <Head>
                <title>Hulu 2.0</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="https://www.freeiconspng.com/uploads/hulu-icon-5.png"/>
            </Head>
            <Header/>
            <Nav/>
            <main className={''}>
                {children}
            </main>

        </div>
    );
};

export default Layout;
