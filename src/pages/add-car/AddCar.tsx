import { useState } from 'react';
import { Form, Input, Select, Button, Upload, DatePicker, Checkbox } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import { CAR_CATEGORIES, TRANSMISSION_TYPES, FUEL_TYPES, CAR_FEATURES } from '../../constants/global';
import { FaUpload } from 'react-icons/fa';
import ArrowDropdown from '../../assets/icons/arrow-dropdown-icon.svg?react';
import { showSuccessMessage } from '../../utils/messageUtils';
import SubHeader from '../../components/core-ui/sub-header/SubHeader';

const { TextArea } = Input;

interface CarFormValues {
    brand: string;
    model: string;
    year: number;
    dailyPrice: number;
    category: string;
    transmission: string;
    fuelType: string;
    seatingCapacity: number;
    location: string;
    features: string[];
    description: string;
}

function AddCar() {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleUploadChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onFinish = (values: CarFormValues) => {
        console.log('Form values:', values);
        console.log('Uploaded files:', fileList);
        showSuccessMessage('Car listed successfully!');
        form.resetFields();
        setFileList([]);
    };

    const uploadProps: UploadProps = {
        name: 'file',
        multiple: false,
        fileList,
        onChange: handleUploadChange,
        beforeUpload: () => false, // Prevent auto upload
        listType: 'picture-card',
        maxCount: 1,
    };

    return (
        <section>
            {/* Header */}
            <SubHeader
                title="Add New Car"
                subTitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications."
            />

            {/* Form */}
            <div role="card" className="custom-card mt-10">
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    className="custom-form-class"
                    requiredMark={false}
                >
                    {/* Upload Picture */}
                    <Form.Item
                        label="Upload a picture of your car"
                        className="mb-6!"
                    >
                        <Upload {...uploadProps}>
                            {fileList.length === 0 && (
                                <div className="flex flex-col items-center justify-center p-4">
                                    <FaUpload className="text-2xl text-text-secondary mb-2" />
                                    <span className="text-sm text-text-secondary">Upload</span>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    {/* Brand and Model */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <Form.Item
                            label="Brand *"
                            name="brand"
                            rules={[{ required: true, message: 'Please enter the brand name.' }]}
                        >
                            <Input
                                placeholder="e.g. BMW, Mercedes, Audi..."
                            />
                        </Form.Item>

                        <Form.Item
                            label="Model *"
                            name="model"
                            rules={[{ required: true, message: 'Please enter the model name.' }]}
                        >
                            <Input
                                placeholder="e.g. X5, E-Class, M4..."
                            />
                        </Form.Item>
                    </div>

                    {/* Year, Daily Price, Category */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <Form.Item
                            label="Year *"
                            name="year"
                            rules={[{ required: true, message: 'Please select the year.' }]}
                        >
                            <DatePicker picker="year" format={"YYYY"} suffixIcon={false} disabledDate={current => current && current.startOf('day').isAfter(new Date(), 'year')}
                                allowClear={false} placeholder="Select year" className="w-full!" />
                        </Form.Item>


                        <Form.Item
                            label="price *"
                            name="price"
                            rules={[
                                { required: true, message: 'Please enter the price in number.' },
                                {
                                    pattern: /^(?:[1-9][0-9]*|0)$/,
                                    message: "Please enter a valid price"
                                }
                            ]}
                        >
                            <Input
                                prefix={<span className="mb-0.5">PKR</span>}
                                placeholder="10000"
                                min={0}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Category *"
                            name="category"
                            rules={[{ required: true, message: 'Please select a category.' }]}
                        >
                            <Select
                                placeholder="Sedan"
                                options={CAR_CATEGORIES}
                                suffixIcon={<ArrowDropdown />}
                            />
                        </Form.Item>
                    </div>

                    {/* Transmission, Fuel Type, Seating Capacity */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <Form.Item
                            label="Transmission *"
                            name="transmission"
                            rules={[{ required: true, message: 'Please select transmission type.' }]}
                        >
                            <Select
                                placeholder="Automatic"
                                suffixIcon={<ArrowDropdown />}
                                options={TRANSMISSION_TYPES}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Fuel Type *"
                            name="fuelType"
                            rules={[{ required: true, message: 'Please select fuel type.' }]}
                        >
                            <Select
                                placeholder="Diesel"
                                options={FUEL_TYPES}
                                suffixIcon={<ArrowDropdown />}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Seating Capacity *"
                            name="seatingCapacity"
                            rules={[
                                { required: true, message: 'Please enter the seating capacity in number.' },
                                {
                                    pattern: /^(?:[1-9][0-9]*|0)$/,
                                    message: "Please enter a valid number"
                                }
                            ]}
                        >
                            <Input
                                placeholder="5"
                                min={0}
                                step="1"
                            />
                        </Form.Item>
                    </div>

                    {/* Location */}
                    <Form.Item
                        label="Location *"
                        className="mb-6!"
                        name="location"
                        rules={[{ required: true, message: 'Please enter the location.' }]}
                    >
                        <Input
                            placeholder="eg, Islamabad, Pakistan"
                        />
                    </Form.Item>


                    {/* Description */}
                    <Form.Item
                        label="Description *"
                        name="description"
                        className="mb-6!"
                        rules={[{ required: true, message: 'Please enter a description.' }]}
                    >
                        <TextArea
                            rows={3}
                            placeholder="Describe your car, its condition, and any notable details..."
                        />
                    </Form.Item>

                    {/* Features */}
                    <Form.Item
                        label="Features *"
                        name="features"
                        className="mb-6!"
                        rules={[{ required: true, message: 'Please select at least 4 features.' }]}
                    >
                        <Checkbox.Group className="w-full ml-1!">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                                {CAR_FEATURES.map((feature) => (
                                    <Checkbox key={feature.value} value={feature.value}>
                                        {feature.label}
                                    </Checkbox>
                                ))}
                            </div>
                        </Checkbox.Group>
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item className='flex justify-end'>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            className="rounded-md!"
                        >
                            ✓ List Your Car
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </section>
    );
}

export default AddCar;