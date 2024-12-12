import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { streamManager } from "../../content";
import { Trash2 } from 'lucide-react';

const RadioGroupComponent = ({ formData, setFormData }) => {

    const handleAddAnswer = () => {
        const newId = formData.options.length + 1;
        setFormData({ ...formData, options: [...formData.options, { id: newId, value: '', votes: 0, selected: false }] })
    };

    const handleDeleteAnswer = (id) => {
        setFormData({ ...formData, options: formData.options.filter(answer => answer.id !== id) });
    };

    const handleAnswerChange = (id, value) => {
        setFormData({
            ...formData, options: formData.options.map(answer => {
                if (answer.id === id) {
                    return { ...answer, value: value };
                }
                return answer;
            })
        });
    };

    return (
        <div className="grid w-full gap-y-4">
            <Label htmlFor="Message">{streamManager.stream_manager_actions.poll.answers}</Label>
            <div className="grid w-full gap-y-3">
                {formData.options.map(answer => (
                    <div key={answer.id} className="flex items-center space-x-2">
                        <Input
                            id={`message-${answer.id}`}
                            onChange={(e) => {
                                handleAnswerChange(answer.id, e.target.value);
                            }}
                            defaultValue={answer.value}
                            placeholder={"Answer"}
                        />
                        {formData.options.length > 2 &&
                            <Trash2 onClick={() => handleDeleteAnswer(answer.id)} />
                        }
                    </div>
                ))}
            </div>
            <Button onClick={handleAddAnswer}>
                Add answer
            </Button>
        </div>
    );
}

export default RadioGroupComponent;
