import { CardWrapper } from './card-wrapper';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

const ErrorCard = () => {
    return (
        <>
            <CardWrapper
                headerLabel="Ooops! Something went wrong"
                backButtonHref="/login"
                backButtonLabel="Back to login"
            >
                <div className="w-full flex justify-center">
                    <ExclamationTriangleIcon />
                </div>
            </CardWrapper>
        </>
    );
};

export default ErrorCard;
