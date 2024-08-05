import Header from "@/components/shared/Header";
import TransformationForm from "@/components/shared/TransformationForm";
import { transformationTypes } from "@/constant";
import { getImageById } from "@/lib/actions/image.action";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

const Page = async ({ params: { id } }: SearchParamProps) => {
    const { userId } = auth();

    if (!userId) redirect('/');

    const user = await getUserById(userId);
    const image = await getImageById(id);

    const transformation = transformationTypes[image.transformationType as TransformationTypeKey]
    const TransformationTitle = transformationTypes[image.transformationType as TransformationTypeKey].title

    return (
        <>
            {/* {TransformationTitle} */}
            <Header title={TransformationTitle} subtitle={transformation.subTitle} />

            <section className="mt-10">
                <TransformationForm
                    action="Update"
                    userId={user._id}
                    type={image.transformationType as TransformationTypeKey}
                    creditBalance={user.creditBalance}
                    config={image.config}
                    data={image}
                />
            </section>
        </>
    )
}

export default Page