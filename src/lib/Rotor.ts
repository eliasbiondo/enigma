export class Rotor {
    private left: string;
    private right: string;
    private notch: string;
    private position: number;

    constructor(left: string, right: string, notch: string, position: number ){
        this.left = left;
        this.position = position;
        this.notch = notch;
        this.right = right;
    }

    public rotor(): void {

    }
    public foward(): void {

    }
    public backward(): void {

    }
    public rotate(): void {

    }
    public rotate_to(): void {

    }
    public reached_notch(): boolean {
        return false;
    }
}