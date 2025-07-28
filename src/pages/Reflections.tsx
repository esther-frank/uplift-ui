interface ReflectionsProps {
    userId: string | null;
}

const Reflections = ({ userId }: ReflectionsProps) => {
    return (
        <div><a href="/">Go back to Login {userId}</a></div>
    )
}

export default Reflections;
