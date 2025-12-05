export const FeatureCard = ({ icon: Icon, title, description }: any) => (
    <div className="p-8 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-shadow duration-300">
        <div className="h-12 w-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
            <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-500 leading-relaxed">
            {description}
        </p>
    </div>
);