import './card.scss';

type Props = {
    year: number;
    description: string;
}

export const Card = ({ year, description }: Props) => {
    return (
        <div className="card-container">
            <div className="year">{year}</div>
            <p className="description">{description}</p>
        </div>
    );
};