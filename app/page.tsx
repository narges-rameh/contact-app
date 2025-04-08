// pages/index.tsx
import Head from 'next/head';
import ContactForm from "@/app/components/ContactForm";
import Header from './components/Header';


const Page: React.FC = () => {
    return (
        <div>
            <Head>
                <title>Contact App</title>
            </Head>
            <Header />
            <ContactForm />
        </div>
    );
};

export default Page;
