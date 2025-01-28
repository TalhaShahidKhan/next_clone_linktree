import { connectToDatabase } from '@/lib/mongodb';
import LinkTree from '@/components/LinkTree';

interface PageProps {
    params: {
        handle: string;
    };
}

export default async function Page({ params }: PageProps) {
    const handle = params.handle;
    const client = await connectToDatabase();
    const db = client.db("setlinks");
    const collection = db.collection("links");
    const doc = await collection.findOne({ handle });

    return <LinkTree 
        handle={doc.handle}
        imageUrl={doc.imageUrl}
        description={doc.description}
        links={doc.links}
    />;
}